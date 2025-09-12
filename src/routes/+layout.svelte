<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "./app.css";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header class="w-full bg-secondary h-16"></header>
<main class="mx-auto flex max-w-[90rem] py-3 h-[86.2vh]">
    {@render children?.()}
</main>
<footer class="w-full bg-secondary h-16"></footer>
