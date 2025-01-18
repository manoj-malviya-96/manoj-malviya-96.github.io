import {Drawer} from 'vaul';
import React from "react";
import {AtomButton, ButtonType} from "./atom-button";
import {AtomTitleText} from "./atom-text";
import {AtomColumn} from "./atom-layout";


interface AtomDialogProps {
	icon?: string;
	title: string;
	children?: React.ReactNode;
}

const AtomDialog: React.FC<AtomDialogProps> = React.memo(({icon, title, children}) => {
	return (
		<Drawer.Root>
			<Drawer.Trigger asChild>
				<AtomButton icon={icon} label={title} type={ButtonType.Outlined} pill={false} />
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black bg-opacity-50"/>
				<Drawer.Content className="bg-black bg-opacity-50 backdrop-blur-lg
											border-t border-neutral rounded-t-lg w-full
											py-8 h-fit fixed bottom-0 left-0 right-0 outline-none">
					<div aria-hidden
					     className="mx-auto w-24 h-2 flex-shrink-0 rounded-full bg-neutral mb-8"/>
					<AtomColumn className={'py-8'}>
						<Drawer.Title><AtomTitleText>{title}</AtomTitleText></Drawer.Title>
						{children}
					</AtomColumn>
				</Drawer.Content>
				<Drawer.Overlay/>
			</Drawer.Portal>
		</Drawer.Root>
	);
});

export default AtomDialog;