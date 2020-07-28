import { observable, action, computed, configure } from 'mobx';
import axios from 'axios';

configure({ enforceActions: true });

class UserStore {
  // 값들에 'observable'로 표시함으로써 'observers'에 의해 관찰됩니다.
    @observable users = [];
    @observable selectedUser = {};
    @computed get selectedId() { return this.selectedUser.id; }

    // enforceActions 모드에서는 오직 action만 mobx state를 변경할 수 있습니다.
    @action setUsers = (users) => { this.users = [...users]; }
    @action selectUser = (user) => { this.selectedUser = user; }

    // observable state를 clear 하기
    @action clearSelectedUser = () => { this.selectedUser = {}; }

    @action getUsers() {
      // ajax 호출과 MobX action의 동기화
      axios.get('http://jsonplaceholder.typicode.com/users')
        .then(response => {
            console.log(response.data)
          this.setUsers([{
            email: "Sincere@april.biz",
            id: 1,
            name: "Leanne Graham",
            phone: "1-770-736-8031 x56442",
            username: "Bret",
            website: "hildegard.org"
        }])
        });
    }
}

const store = new UserStore();

export default store;
