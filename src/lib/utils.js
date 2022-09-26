const setActive = (items, key, value) => {
  return items.map(item => {
    item.active = item[key] === value ? 'active' : '';
    return item;
  })
};

const setCustomRoute = (items, key, defaultSlug, customSlug) => {
  return items.map(item => {
    const id = item[key];

    if ( id === defaultSlug ) {
      item.url = `/${id}`;
    }
    else {
      item.url = `/${customSlug}/${id}`
    };

    return item;
  });
}

const getBreadcrumbs = req => {
  const routeLinks = req.originalUrl.split('/').map(item => {
    return item === '' ? '/' : item;
  });

  const routeNames = routeLinks.map((item, i) => {
    if(item === '/' && i < (routeLinks.length - 1)) {
      item = 'Página principal'
    }
    const name = item.charAt(0).toUpperCase() + item.slice(1);
    return name.split('-').join(' ');
  });

  const routes = routeNames.map((item, i) => {
    return {
      name: item,
      link: routeLinks[i],
      active: i === (routeLinks.length - 1) ? 'active' : ''
    }
  });

  return routes;
}


module.exports = {
  setActive,
  setCustomRoute,
  getBreadcrumbs
}