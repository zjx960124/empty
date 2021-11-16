const getDefaultState = () => {
  return {
    pageData: {}
  }
}

const state = getDefaultState();

const mutations = {
  setPageData: (state, pageData) => {
    state.pageData = pageData
  },
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
