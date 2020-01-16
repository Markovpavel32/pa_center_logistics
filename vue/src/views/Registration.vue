<template>
  <div class="d-flex flex-column mt-xxxl align-items-center">
    <div class="d-flex flex-column">
      <div class="mb-3 align-self-center">
        <h3 class="bold">Правила регистрации нового пользователя</h3>
      </div>
      <b-card-group deck class="mb-default">
        <b-card bg-variant="light">
          <b-card-body class="d-flex">
            <div class="mr-default mt-xs">
              <div class="badge-number-xl">1</div>
            </div>
            <div>Необходимо быть действующим клиентом компании Центр Логистика терминал</div>
          </b-card-body>
        </b-card>
        <b-card bg-variant="light">
          <b-card-body class="d-flex">
            <div class="mr-default mt-xs">
              <div class="badge-number-xl">2</div>
            </div>
            <div>Укажите и отправьте необходимые данные. Или позвоните нашим специалистам<br/> +7 495 925-88-10</div>
          </b-card-body>
        </b-card>
        <b-card bg-variant="light">
          <b-card-body class="d-flex">
            <div class="mr-default mt-xs">
              <div class="badge-number-xl">3</div>
            </div>
            <div>После отправки данных вы получите логин и пароль, необходимые для активации ЛК</div>
          </b-card-body>
        </b-card>
      </b-card-group>
      <div class="align-self-center col-sm-4">
        <div class="mb-default h5">Регистрация</div>
        <div class="form-group">
          <input v-model="login" class="mb-default form-control" placeholder="Название компании"/>
        </div>
        <div class="form-group">
          <input class="mb-default form-control" placeholder="Контактное лицо"/>
        </div>
        <div class="form-group">
          <input class="mb-default form-control" placeholder="Электронный адрес"/>
        </div>
        <div class="form-group">
          <input class="mb-default form-control" placeholder="Контактный номер телефона"/>
        </div>
        <button class="btn btn-danger d-block w-100 mb-default">Получить логин и пароль</button>
        <router-link :to="{ name: 'login' }" class="btn btn-secondary d-block w-100" tag="button">Вернуться к логину</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'registration'
}
</script>

<style scoped>

</style>
