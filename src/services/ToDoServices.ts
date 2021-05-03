import { ToDoTask } from '../contexts/ToDoContext';
import { AuthenticationUserId } from '../contexts/AuthenticationContext';
import { firestore } from '../libs/Firebase';

type ToDoDocumentData = {
  content: string;
};

const usersCollection = firestore.collection('users');

const get = (uid: AuthenticationUserId): Promise<Array<ToDoTask>> => {
  if (!uid) {
    throw new Error('ユーザーIDが不明なため、データ取得に失敗しました。');
  }
  return usersCollection
    .doc(uid)
    .collection('todos')
    .get()
    .then((data) => {
      return data.docs.map((doc) => {
        const { content } = doc.data() as ToDoDocumentData;
        return {
          id: doc.id,
          content,
        };
      });
    });
};

export default { get };
