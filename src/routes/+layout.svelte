<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "./app.css";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header class="bg-secondary w-full">
    <nav class="navbar flex items-center h-full max-w-7xl m-auto">
        <ul class="navbar-start gap-x-4 text-secondary-content">
            <li>
                <a class="btn btn-ghost" href="/">Главная</a>
            </li>
            <li>
                <a class="btn btn-ghost" href="/about">О нас</a>
            </li>
            <li>
                <a class="btn btn-ghost" href="/feedback">Обратная связь</a>
            </li>
        </ul>
    </nav>
</header>
<main class="mx-auto flex max-w-7xl py-3">
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
