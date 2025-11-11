<script lang="ts">
	import { FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	let chats = [
		{ id: 1, name: 'Chat Group 1', selected: false },
		{ id: 2, name: 'Chat Group 2', selected: false },
		{ id: 3, name: 'Chat Group 3', selected: false }
	];

	function toggleSelection(chatId: number) {
		chats = chats.map((chat) =>
			chat.id === chatId ? { ...chat, selected: !chat.selected } : chat
		);
	}
</script>

<div class="chat-list">
	<h2>Select Chats to View Tweet</h2>
	{#each chats as chat}
		<div class="chat-item">
			<!-- <DataTable
                id={`chat-${chat.id}`}
                checked={chat.selected}
                on:change={() => toggleSelection(chat.id)}
            /> -->
			<label for={`chat-${chat.id}`}>{chat.name}</label>
		</div>
	{/each}
</div>

<Table.Root>
	<Table.Caption>A list of your recent invoices.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Invoice</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Method</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell class="font-medium">INV001</Table.Cell>
			<Table.Cell>Paid</Table.Cell>
			<Table.Cell>Credit Card</Table.Cell>
			<Table.Cell class="text-right">$250.00</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>

<style>
	.chat-list {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		max-width: 400px;
		margin: 0 auto;
	}
	.chat-item {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.chat-item label {
		margin-left: 0.5rem;
	}
</style>
