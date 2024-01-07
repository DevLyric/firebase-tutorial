import { useEffect, useState } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

type Doc = {
  id: string;
  name: string;
  age: number;
};

const App = () => {
  // Estado para armazenar o nome e idade do novo usuário, bem como a lista de usuários existentes.
  const [newUsername, setNewUsername] = useState("");
  const [newUserAge, setNewUserAge] = useState<number | undefined>(undefined);
  const [users, setUsers] = useState<Doc[]>([]);

  // Referência à coleção "users" no Firestore.
  const usersCollectionRef = collection(db, "users");

  // Função para criar um novo usuário.
  const createUser = async () => {
    // Verifica se o nome não está vazio e a idade é definida.
    if (newUsername.trim() !== "" && newUserAge !== undefined) {
      // Adiciona um novo documento à coleção com os dados fornecidos.
      await addDoc(usersCollectionRef, {
        name: newUsername,
        age: Number(newUserAge),
      });
      // Recarrega a página para refletir as mudanças.
      window.location.reload();
    }
  };

  const updateUser = async (id: string, age: number) => {
    // Referência ao documento do usuário no Firestore.
    const userDoc = doc(db, "users", id);
    // Define os novos campos a serem atualizados.
    const newFields = { age: age + 1 };
    // Atualiza o documento com os novos campos.
    await updateDoc(userDoc, newFields);
    // Recarrega a página para refletir as mudanças.
    window.location.reload();
  };

  // Função para excluir um usuário.
  const deleteUser = async (id: string) => {
    // Referência ao documento do usuário no Firestore.
    const userDoc = doc(db, "users", id);
    // Exclui o documento.
    await deleteDoc(userDoc);
    // Recarrega a página para refletir as mudanças.
    window.location.reload();
  };

  // Efeito colateral para buscar os usuários ao montar o componente.
  useEffect(() => {
    const getUsers = async () => {
      // Obtém os documentos da coleção "users".
      const data = await getDocs(usersCollectionRef);
      // Converte os documentos em um array de objetos e atualiza o estado.
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Doc)));
    };

    // Chama a função para obter os usuários.
    getUsers();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center px-5">
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="border rounded p-2"
          value={newUsername}
          onChange={(event) => setNewUsername(event.target.value)}
        />
        <input
          type="number"
          className="border rounded p-2"
          value={newUserAge}
          onChange={(event) => setNewUserAge(parseInt(event.target.value))}
        />

        <button
          onClick={createUser}
          className="rounded p-2 bg-blue-400 text-white font-medium"
        >
          Create user
        </button>
      </div>
      <div className="my-8">
        {users.map((user) => {
          return (
            <div key={user.id} className="flex items-center gap-3 my-2">
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <button
                onClick={() => {
                  updateUser(user.id, user.age);
                }}
                className="rounded p-2 bg-green-400 text-white font-medium"
              >
                Increase Age
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="rounded p-2 bg-red-500 text-white font-medium"
              >
                Delete user
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
