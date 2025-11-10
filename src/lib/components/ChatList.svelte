<script>
    import { Checkbox } from "@shadcn/ui";
    let chats = [
        { id: 1, name: "Chat Group 1", selected: false },
        { id: 2, name: "Chat Group 2", selected: false },
        { id: 3, name: "Chat Group 3", selected: false },
    ];

    function toggleSelection(chatId) {
        chats = chats.map(chat =>
            chat.id === chatId ? { ...chat, selected: !chat.selected } : chat
        );
    }
</script>

<div class="chat-list">
    <h2>Select Chats to View Tweet</h2>
    {#each chats as chat}
        <div class="chat-item">
            <Checkbox
                id={`chat-${chat.id}`}
                checked={chat.selected}
                on:change={() => toggleSelection(chat.id)}
            />
            <label for={`chat-${chat.id}`}>{chat.name}</label>
        </div>
    {/each}
</div>

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