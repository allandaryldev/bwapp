
const route = 'api/v1/';
const citizen_route = `${route}citizens`;
const user_route = `${route}user`;
const counter_route = `${route}counter`;
export const state = () => ({
  counter: {},
  citizens: {
    data:[],
    meta:{
      total:0
    }
  },
  citizen: {}
});

export const getters = {
  counter(state) { return state.counter },
  citizens(state) { return state.citizens },
  citizen(state) { return state.citizen },
};

export const mutations = {
  SET_COUNTER(state, data)
  {
    state.counter = data;
  },
  SET_CITIZENS(state, data)
  {
    state.citizens = data;
  },
  SET_CITIZEN(state, data)
  {
    state.citizen = data;
  }
};

export const actions = {
  async get({ commit }, payload)
  {
    try
    {
      const response = await this.$axios.get(`${citizen_route}`, payload)
      commit('SET_CITIZENS', response.data)
      return Promise.resolve(response.data)
    } catch (error)
    {
      // console.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
  async getCounter({ commit }, payload)
  {
    try
    {
      const response = await this.$axios.get(`${counter_route}`)
      commit('SET_COUNTER', response.data)
      return Promise.resolve(response.data)
    } catch (error)
    {
      // console.error(error.response.data.message);
      return Promise.reject(error);
    }
  },
  async create({ commit }, payload)
  {
    try
    {
      let response = await this.$axios.post(`${citizen_route}`, payload)
      if (response.data)
      {
        alert("New Citizen Added!");
      }
      return Promise.resolve(response.data)
    } catch (error)
    {
      return Promise.reject(error.response.data.errors);
    }
  },
  async show({ commit }, payload)
  {
    try
    {
      const response = await this.$axios.get(`${citizen_route}/${payload}`)
      commit('SET_CITIZEN', response.data.data);
      return Promise.resolve(response.data.data)
    } catch (error)
    {
      this.$toast.error(error.response.data.message);
      return Promise.reject(false);
    }
  },
  async update({ commit }, payload)
  {
    try
    {
      const { id } = payload;
      const response = await this.$axios.put(`${citizen_route}/${id}`, payload)
      if (response.data)
      {
        alert("Citizen Updated!");
      }

      return Promise.resolve(response.data)
    } catch (error)
    {
      this.$toast.error(error.response.data.message);
      return Promise.reject(false);
    }
  },
  async delete({ commit }, payload)
  {
    try
    {
      const response = await this.$axios.delete(`${citizen_route}/${payload}`);
      alert("Deleted Successfully!");
      return Promise.resolve(true)
    } catch (error)
    {
      this.$toast.error(error.response.data.message);
      return Promise.reject(false);
    }
  },
}