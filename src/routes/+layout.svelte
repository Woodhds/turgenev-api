<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import "./app.css";
    import logo from "$lib/assets/logo.svg";
    import { page } from "$app/state";

    const isActive = (path: string) => {
        return page.url.pathname === path;
    };

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header class="bg-secondary w-full flex px-4 sticky top-0">
    <nav class="navbar flex items-center h-full max-w-7xl m-auto">
        <ul class="navbar-start gap-x-4 text-secondary-content">
            <li class="flex items-center text-secondary-content gap-x-4 flex-1">
                <a
                    class="flex items-center gap-x-4 text-xl"
                    href="/"
                    aria-label="Главная"
                >
                    <img class="h-10" src={logo} alt="Logo" />
                    Текстометр
                </a>
            </li>
        </ul>
        <ul class="navbar-end gap-x-4 text-secondary-content">
            <li>
                <a
                    class="btn btn-ghost {isActive('/about')
                        ? 'bg-secondary-content text-base-content'
                        : undefined}"
                    href="/about">О нас</a
                >
            </li>
            <li>
                <a
                    class="btn btn-ghost {isActive('/feedback')
                        ? 'bg-secondary-content text-base-content'
                        : undefined}"
                    href="/feedback">Обратная связь</a
                >
            </li>
        </ul>
    </nav>
</header>
<main class="mx-auto flex max-w-7xl py-3 sm:px-0 px-3">
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
