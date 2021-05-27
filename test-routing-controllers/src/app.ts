import { createKoaServer } from 'routing-controllers';
import { UserControllerKoa } from './UserControllerKoa';


const app = createKoaServer({
    controllers: [ UserControllerKoa ]
});

app.listen(1330, () => {
    console.log('started');
});