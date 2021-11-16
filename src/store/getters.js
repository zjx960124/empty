const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.username,
  routers: state => state.user.routers,
  depts: state => state.user.depts,
  roles: state => state.user.roles,
  roleCodesString: state => state.user.roleCodesString,
  roleNamesString: state => state.user.roleNamesString,
  appAttributeInfo: state => state.info.appAttributeInfo,
  appId: state => state.info.appId,
  appCode: state => state.info.appCode,
  pageData: state => state.draw.pageData
}
export default getters
