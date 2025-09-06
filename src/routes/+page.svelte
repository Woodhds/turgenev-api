<script lang="ts">
    import { foo } from "./data.remote";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";

    type UserState = {
        token: string;
        history: { link: string; date: string }[];
        lastText: string;
    };
    let loading = $state(true);
    let api = $state("risk");

    let userState = $state<UserState>({
        token: "",
        history: [],
        lastText: "",
    });
    let text = $state(userState?.lastText);
    let history = $derived.by(() => {
        const s = userState.history.map((z) => ({
            date: new Date(z.date),
            link: z.link,
        }));
        s.sort((a, b) => b.date - a.date);
        return s;
    });

    onMount(() => {
        const localState = localStorage.getItem("user_state");
        if (localState) {
            userState = JSON.parse(localState) as UserState;
        }
        loading = false;
    });

    const onSubmit = async ({ submit }) => {
        try {
            loading = true;
            await submit();
            if (foo.result?.link) {
                userState.history.push({
                    date: new Date().toLocaleString(),
                    link: foo.result.link,
                });
                if (userState.history.length > 10) {
                    userState.history.shift();
                }
                localStorage.setItem("user_state", JSON.stringify(userState));
            }
        } finally {
            loading = false;
        }
    };

    const isSelected = (is: string) => {
        return is === api;
    };

    const removeToken = () => {
        userState = {
            token: "",
            history: [],
            lastText: "",
        };
        localStorage.setItem("user_state", JSON.stringify(userState));
    };

    const addToken = (e: SubmitEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        const token = fd.get("token");
        if (!token) {
            return;
        }
        userState.token = token.toString();
        localStorage.setItem("user_state", JSON.stringify(userState));
    };
</script>

<div class="grid grid-cols-2 gap-x-16 w-full">
    {#if loading}
        <div class="skeleton h-[40rem] w-[44rem]"></div>
    {:else if !userState.token}
        <form onsubmit={addToken} class="flex flex-col w-1/2">
            <label for="token" class="label mb-4">Добавить ключ</label>
            <input type="text" class="input input-accent mb-4" name="token" />
            <button class="btn btn-success">Добавить</button>
        </form>
    {:else}
        <div>
            <div class="mb-4">
                <button class="btn btn-error" onclick={removeToken}
                    >Удалить ключ</button
                >
            </div>
            <form {...foo.enhance(onSubmit)} class="grid grid-cols-1 gap-y-5">
                <select class="select" name="api" bind:value={api}>
                    <option value="risk" selected={isSelected("risk")}
                        >Общий риск</option
                    >
                    <option value="frequency" selected={isSelected("frequency")}
                        >Повторы</option
                    >
                    <option value="style" selected={isSelected("style")}
                        >Стилистика</option
                    >
                    <option value="keywords" selected={isSelected("keywords")}
                        >Запросы</option
                    >
                    <option value="formality" selected={isSelected("formality")}
                        >Водность</option
                    >
                    <option
                        value="readability"
                        selected={api === "readability" ? true : false}
                        >Удобочитаемость</option
                    >
                </select>
                <input type="hidden" name="key" value={userState.token} />

                <div class="flex">
                    <textarea
                        class="textarea-info outline p-2"
                        cols="100"
                        rows="20"
                        name="text"
                        placeholder="Введите текст"
                        bind:value={text}
                    >
                    </textarea>
                </div>
                <button class="btn btn-primary" type="submit">Отправить</button>
            </form>
        </div>
    {/if}

    <div class="w-1/2 mt-4">
        <h2 class="text-2xl mb-6">Последние 10 запросов</h2>
        <ol>
            {#each history as { link, date } (link + date)}
                <li animate:flip>
                    <a
                        id={link}
                        class="mb-4 link w-full block"
                        target="_blank"
                        href={"https://turgenev.ashmanov.com/?t=" + link}
                        >ссылка - {date.toLocaleString()}
                    </a>
                </li>
            {/each}
        </ol>
    </div>
</div>

<svelte:head>
    <title>Turgenev - API</title>
</svelte:head>
