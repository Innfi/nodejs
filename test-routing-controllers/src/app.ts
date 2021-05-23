import { createKoaServer } from 'routing-controllers';
import { UserController } from './UserController';


const app = createKoaServer({
    controllers: [ UserController ]
});

app.listen(1330, () => {
    console.log('started');
});