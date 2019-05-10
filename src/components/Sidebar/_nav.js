/**
 * @author {[Monty Khanna]}
 */
export default {
  items: [
    {
      title: true,
      name: 'Desk',
      wrapper: {            // optional wrapper object
        element: 'span',      // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: 'my-class', style: { fontFamily: 'Verdana' }, id: 'my-id'}
      },
      class: 'text-center'             // optional class names space delimited list for title item ex: 'text-center'
    },
    {
      name: 'Dashboard',
      url: '/',
      icon: 'fa fa-desktop'
    },
    {
      title: true,
      name: 'Administrator',
      wrapper: {
        element: 'span',
        attributes: {}
      },
      class: 'text-center'
    },
    {
      name: 'Admin Tools',
      url: '/adminTools',
      icon: 'fa fa-superpowers',
      children: [
        {
          name: 'User Permissions',
          url: '/adminTools/userPermission',
          icon: 'fa fa-unlock-alt'
        },
        {
          name: 'Users',
          url: '/adminTools/users',
          icon: 'fa fa-users'
        }
      ]
    },
    {
      name: 'Clients',
      url: '/clients',
      icon: 'fa fa-users',
      children: [
        {
          name: 'Client',
          url: '/clients/client',
          icon: 'fa fa-pencil'
        },
        {
          name: 'List Clients',
          url: '/clients/listClients',
          icon: 'fa fa-list'
        }
      ]
    }
  ]
};
