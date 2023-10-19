'use client'

import { TextField , Button} from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
	return (
		<div className='max-w-xl space-y-4'>
			<TextField.Root>
				<TextField.Input placeholder='Title' />
			</TextField.Root>
			<SimpleMDE placeholder='Reply to comment…' />
            <Button>Submit New Issue</Button>
		</div>
	);
};

export default NewIssuePage;
