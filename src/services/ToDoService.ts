import {
  collection as FirestoreCollection,
  Timestamp as FirestoreTimestamp,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { firestore } from '../libs/Firebase';
import { ToDoTask } from '../contexts/ToDoContext';
import { AuthenticationUserId } from '../contexts/AuthenticationContext';

type ToDoDocumentData = {
  content: string;
  createdAt: FirestoreTimestamp;
};

const getUserTodosCollection = (uid: AuthenticationUserId) => {
  if (!uid) {
    return null;
  }
  return FirestoreCollection(doc(firestore, 'users', uid), 'todos');
};

const get = (uid: AuthenticationUserId): Promise<Array<ToDoTask>> => {
  const collection = getUserTodosCollection(uid);
  if (!collection) {
    throw new Error('ユーザーIDが不明なため、データ取得に失敗しました。');
  }
  return getDocs(query(collection, orderBy('createdAt', 'desc'))).then((data) => {
    return data.docs.map((doc) => {
      const { content, createdAt } = doc.data() as ToDoDocumentData;
      const { id } = doc;
      return {
        id,
        content,
        createdAt: createdAt.toDate(),
      };
    });
  });
};

const insert = (uid: AuthenticationUserId, content: string): Promise<ToDoTask> => {
  const collection = getUserTodosCollection(uid);
  if (!collection) {
    throw new Error('ユーザーIDが不明なため、データ作成に失敗しました。');
  }
  return addDoc(collection, {
    content,
    createdAt: serverTimestamp(),
  }).then((docRef) => {
    return getDoc(docRef).then((doc) => {
      const { content, createdAt } = doc.data() as ToDoDocumentData;
      const { id } = doc;
      return {
        id,
        content,
        createdAt: createdAt.toDate(),
      };
    });
  });
};

const remove = (uid: AuthenticationUserId, documentId: string): Promise<void> => {
  const collection = getUserTodosCollection(uid);
  if (!collection) {
    throw new Error('ユーザーIDが不明なため、データ削除に失敗しました。');
  }
  return deleteDoc(doc(collection, documentId));
};

export default { get, insert, remove };
