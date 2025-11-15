<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';

	type Chat = {
		chat_id: number;
		name: string;
		members?: number;
	};

	let {
		chat_selected, // Remove $bindable()
		toggleSelection,
		chats
	} = $props<{
		chat_selected: { [chat_id: number]: boolean };
		toggleSelection: (chatId: number) => void;
		chats: Chat[];
	}>();

	console.log('ChatList component initialized with chats:', chats);
</script>

<div class="chat-list">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[50px]">Select</Table.Head>
				<Table.Head>Chat Name</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each chats as chat}
				<Table.Row>
					<Table.Cell>
						<Checkbox
							checked={chat_selected[chat.chat_id]}
							onCheckedChange={() => toggleSelection(chat.chat_id)}
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">
						{chat.name}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<style>
	.chat-list {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		max-width: 400px;
		margin: 0 auto;
	}
</style>
