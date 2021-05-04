import { ToDoTask } from '../contexts/ToDoContext';
import { AuthenticationUserId } from '../contexts/AuthenticationContext';
import { firestore } from '../libs/Firebase';

type ToDoDocumentData = {
  content: string;
};

const getUserTodosCollection = (uid: AuthenticationUserId) => {
  if (!uid) {
    return null;
  }
  return firestore.collection('users').doc(uid).collection('todos');
};

const get = (uid: AuthenticationUserId): Promise<Array<ToDoTask>> => {
  const collection = getUserTodosCollection(uid);
  if (!collection) {
    throw new Error('ユーザーIDが不明なため、データ取得に失敗しました。');
  }
  return collection.get().then((data) => {
    return data.docs.map((doc) => {
      const { content } = doc.data() as ToDoDocumentData;
      const { id } = doc;
      return { id, content };
    });
  });
};

export default { get };
