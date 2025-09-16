<div class=" w-full flex flex-col">
    <div class="mb-6">
        Спасибо, что нашли время написать нам! <br />Ваши комментарии,
        предложения и вопросы важны для нас – они помогают сделать наш сервис
        лучше. <br />Пожалуйста, заполните форму ниже, и мы ответим вам в
        ближайшее время.
    </div>
    <form class="w-full sm:max-w-1/2">
        <fieldset class="form fieldset w-full">
            <label class="label" for="email">Email для обратной связи</label>
            <input
                type="email"
                required
                class="input input-secondary validator"
                name="email"
                id="email"
            />
            <div class="validator-hint">
                Введите действительный адрес электронной почты
            </div>

            <label class="label" for="message">Ваше сообщение</label>
            <textarea
                required
                class="textarea textarea-secondary w-full validator"
                rows="10"
                name="message"
                id="message"
            >
            </textarea>
            <div class="validator-hint">Введите отзыв</div>
            <input
                type="submit"
                value="Отправить"
                class="btn btn-secondary w-1/2"
            />
        </fieldset>
    </form>
</div>

<svelte:head>
    <title>Обратная связь</title>
</svelte:head>
