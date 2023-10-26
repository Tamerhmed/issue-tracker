'use client';

import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;

// interface IssueForm {
// 	title: string;
// 	description: string;
// }

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
	});
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleData = async (data: IssueFormData) => {
		// console.log(data);
		try {
			setIsSubmitting(true);
				if (issue) {
					await axios.patch('/api/issues/' + issue.id, data);
				} else {
					await axios.post('/api/issues', data);
				}
			setIsSubmitting(false);
			router.push('/issues');
			router.refresh();
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occurred.');
		}
	};

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root
					color='red'
					className='mb-5'
				>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				className='space-y-4'
				onSubmit={handleSubmit(handleData)}
			>
				<TextField.Root>
					<TextField.Input
						defaultValue={issue?.title}
						placeholder='Title'
						{...register('title')}
					/>
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => (
						<SimpleMDE
							placeholder='Reply to comment…'
							{...field}
						/>
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					{issue ? 'Update Issue' : 'Submit New Issue'}{' '}
					{isSubmitting && <Spinner />}
				</Button>
				<DevTool control={control} />
			</form>
		</div>
	);
};

export default IssueForm;
