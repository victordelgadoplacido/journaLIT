<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
   </script>
    
   <div class="grid w-full gap-1.5">
    <Label for="title">Title</Label>
    <Textarea placeholder="Type in your post's title." id="title" />
   </div>