<script lang="ts">
    import { foo } from "./data.remote";
    import { onMount } from "svelte";

    type UserState = {
        token: string;
        history: { link: string; date: string }[];
        lastText: string;
    };
    let loading = $state(false);

    let userState = $state<UserState>({
        token: "",
        history: [],
        lastText: "",
    });
    let text = $state(userState?.lastText);

    onMount(() => {
        const localState = localStorage.getItem("user_state");
        if (localState) {
            userState = JSON.parse(localState) as UserState;
        }
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
        <div class="skeleton h-[32rem] w-[32rem]"></div>
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
                <select class="select" name="api">
                    <option>risk</option>
                    <option>frequency</option>
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

    <div class="w-1/2 mt-12">
        {#each userState.history as { link, date }}
            <a
                class="mb-4 link w-full block"
                target="_blank"
                href={"https://turgenev.ashmanov.com/?t=" + link}
                >ссылка - {date}
            </a>
        {/each}
    </div>
</div>

<svelte:head>
    <title>Turgenev - API</title>
</svelte:head>
