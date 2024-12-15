# Create backend driven navigation routes with server-side authorization in Laravel
[![npm version](https://badge.fury.io/js/%40honed%2Fnav.svg)](https://badge.fury.io/js/%40honed%2Fnav)


## Installation
You can install the package via npm:

```bash
npm i @honed/nav
```

## Usage

```javascript
import { useNav } from '@honed/nav';

const nav = useNav();

// ...

<a v-for="item in nav" :href="item.url" :class="{ 'active': item.isActive }">
    {{ item.name }}
</a>
```

## Credits

- [Joshua Wallace](https://github.com/honedlabs)
- [All Contributors](../../contributors)

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.