<script lang="ts">
    import { foo, type AnalysisResult, type Detail } from "./data.remote";
    import { onMount } from "svelte";

    type UserState = {
        token: string;
    };

    type ApiEnum = Record<
        | "risk"
        | "frequency"
        | "style"
        | "keywords"
        | "formality"
        | "readability",
        string
    >;

    const apiRecord: ApiEnum = {
        risk: "Общий риск",
        frequency: "Повторы",
        style: "Стилистика",
        keywords: "Запросы",
        formality: "Водность",
        readability: "Удобочитаемость",
    };

    let apis = $derived(
        Object.keys(apiRecord).map((key) => {
            const apiKey = key as keyof ApiEnum;
            const data = apiRecord[apiKey];
            return { apiKey, data };
        }),
    );

    let loading = $state(true);
    let api = $state("risk");

    let userState = $state<UserState>({
        token: "",
    });
    let text = $state("");
    let ap = $state("");

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
            ap = apiRecord[api as keyof ApiEnum];
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
            <fieldset class="fieldset gap-y-4">
                <fieldset-legend>Добавить ключ</fieldset-legend>
                <input type="text" class="input input-secondary" name="token" />
                <button class="btn btn-secondary">Добавить</button>
            </fieldset>
        </form>
    {:else}
        <div>
            <div class="mb-4">
                <button class="btn btn-error" onclick={removeToken}
                    >Удалить ключ
                </button>
            </div>
            <form
                {...foo.enhance(onSubmit)}
                class="flex flex-col w-full gap-y-5"
            >
                <select
                    class="select select-secondary"
                    name="api"
                    bind:value={api}
                >
                    {#each apis as { apiKey, data }}
                        <option value={apiKey} selected={isSelected(apiKey)}
                            >{data}
                        </option>
                    {/each}
                </select>
                <input type="hidden" name="key" value={userState.token} />
                <textarea
                    class="textarea textarea-secondary p-2 w-full"
                    rows="20"
                    name="text"
                    placeholder="Введите текст"
                    bind:value={text}
                >
                </textarea>
                <button class="btn btn-secondary" type="submit"
                    >Отправить</button
                >
            </form>
        </div>
    {/if}

    <div class="w-full">
        {#if loading}
            <div class="skeleton h-[40rem] w-[44rem]"></div>
        {:else if userState.token}
            <table class="table w-full">
                <thead class="bg-secondary text-secondary-content text-center">
                    <tr>
                        <th>Категория</th>
                        <th>Информация</th>
                        <th>Ссылка</th>
                    </tr>
                </thead>
                {#if foo.result}
                    <tbody>
                        {#if foo.result.details}
                            <tr>
                                <td>Общий риск</td>
                                <td
                                    ><b
                                        >{foo.result.risk} ({foo.result
                                            .level})</b
                                    ></td
                                >
                                <td>
                                    <a
                                        class="mb-4 link w-full block"
                                        target="_blank"
                                        href={"https://turgenev.ashmanov.com/?t=" +
                                            foo.result.link}
                                        >Результат
                                    </a>
                                </td>
                                <td>
                                    <ul>
                                        {#each foo.result.params as param}
                                            <li>
                                                {param.name} -
                                                <b>{param.value}</b>
                                                ({param.score})
                                            </li>
                                        {/each}
                                    </ul>
                                </td>
                            </tr>
                            {#each foo.result.details as detail}
                                {@const k = detail.block as keyof ApiEnum}
                                <tr>
                                    <td>{apiRecord[k]}: <b>{detail.sum}</b></td>
                                    <td>
                                        <ul>
                                            {#each detail.params as param}
                                                <li>
                                                    {param.name} -
                                                    <b>{param.value}</b>
                                                    ({param.score})
                                                </li>
                                            {/each}
                                        </ul>
                                    </td>
                                    <td>
                                        <a
                                            class="mb-4 link w-full block"
                                            target="_blank"
                                            href={"https://turgenev.ashmanov.com/?t=" +
                                                detail.link}
                                            >Результат
                                        </a>
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td>
                                    {ap}
                                </td>
                                <td>
                                    {#each foo.result.params as param}
                                        <li>
                                            {param.name} -
                                            <b>{param.value}</b>
                                            ({param.score})
                                        </li>
                                    {/each}
                                </td>
                                <td>
                                    <a
                                        class="mb-4 link w-full block"
                                        target="_blank"
                                        href={"https://turgenev.ashmanov.com/?t=" +
                                            foo.result.link}
                                        >Результат
                                    </a>
                                </td>
                            </tr>
                        {/if}
                    </tbody>
                {/if}
            </table>
        {/if}
    </div>
</div>

<svelte:head>
    <title>Текстометр</title>
</svelte:head>
