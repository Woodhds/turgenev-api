<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "./app.css";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header class="w-full bg-secondary"></header>
<main class="mx-auto flex max-w-[90rem] py-3">
    {@render children?.()}
</main>
<footer class="footer w-full bg-secondary"></footer>

<style>
    :root {
        --header-height: calc(var(--spacing) * 16);
    }

    header {
        height: var(--header-height);
    }

    footer {
        height: var(--header-height);
    }

    main {
        min-height: calc(100vh - var(--header-height) * 2);
    }
</style>
