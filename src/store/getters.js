const getters = {
  sidebar: state => state.sidebar.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roleList: state => state.user.roleList
}
export default getters
