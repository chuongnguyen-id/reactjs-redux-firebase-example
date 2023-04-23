/* eslint-disable react-hooks/exhaustive-deps */
// hooks
import { useEffect, useRef, useState } from "react";

// redux
import { useAppDispatch, useAppSelector } from "../store/store";
import { addPerson } from "../store/feathers/personSlice";

// firebase
import { ref, child, get, remove, update, push } from "firebase/database";
import { database } from "../firebase";

// antd
import { Button, Card, Input } from "antd";

const Main = () => {
  const persons = useAppSelector((state) => state.person.persons);

  const [data, setData] = useState(persons);
  const [isValid, setIsValid] = useState(false);

  const name = useRef<string>("");
  const dispatch = useAppDispatch();
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `person`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setData(snapshot.val());
          dispatch(addPerson(snapshot.val()));
        } else {
          console.log("No data available");
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setIsValid(false);
  }, [isValid]);

  function createPersonData(name: string) {
    push(child(dbRef, `person/`), {
      name: name,
    });
    window.alert("Create Successful!");
    setIsValid(true);
  }

  function updatePersonData(index: any, name: string) {
    const key = Object.keys(data)[index];
    const personRef = child(dbRef, `person/${key}`);
    update(personRef, {
      name: name,
    });
    window.alert("Update Successful!");
    setIsValid(true);
  }

  function deletePersonData(index: any) {
    const key = Object.keys(data)[index];
    remove(child(dbRef, `person/${key}`));
    window.alert("Delete Successful!");
    setIsValid(true);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: 40,
          justifyContent: "center",
        }}
      >
        <Card title="Person Name List">
          <label htmlFor="">Person Name</label>
          <Input
            style={{ width: "80%", margin: 5 }}
            onChange={(e) => (name.current = e.target.value)}
          />
          <Button type="primary" onClick={() => createPersonData(name.current)}>
            Add
          </Button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map((person, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Input
                      style={{ margin: 5 }}
                      defaultValue={person.name}
                      onChange={(e) => (name.current = e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      style={{ margin: 5 }}
                      type="primary"
                      onClick={() => deletePersonData(index)}
                    >
                      delete
                    </Button>
                    <Button
                      style={{ margin: 5 }}
                      type="primary"
                      onClick={() => updatePersonData(index, name.current)}
                    >
                      update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};

export default Main;
