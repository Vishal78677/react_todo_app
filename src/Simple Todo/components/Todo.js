import React, { useEffect, useState } from 'react';
import './todo.css';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-toastify';

// to get the data form Local storage

const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
};

const Todo = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState(getLocalItems());
  // const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [toggle, setToggle] = useState(true);

  const handleAdd = () => {
    if (!value) {
      toast.info('Please write first !', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else if (editId) {
      const updatedItem = todos.map((ele) => {
        if (ele.id === editId) {
          return { ...ele, name: value };
        }

        return ele;
      });
      setTodos(updatedItem);
      setValue('');
      setEditId(null);
      setToggle(true);
      // console.log(updatedItem);
    } else {
      const findExistedItem = todos.find((i) => {
        return i.name === value;
      });

      if (findExistedItem) {
        return toast.info(' Your todo is already in list !', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }

      // todos.push({ id: uuidV4(), name: value });

      setTodos([...todos, { id: uuidV4(), name: value }]);
      setValue('');
    }
  };

  const handleDelete = (id) => {
    const filterTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(filterTodos);
  };

  const handleEdit = (id) => {
    const findEditItem = todos.find((todo) => {
      return todo.id === id;
    });
    setValue(findEditItem.name);
    setEditId(id);
    setToggle(false);
    // console.log('🚀 ~ file: Todo.js:10 ~ Todo ~ editId', editId);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  // Add Data To Local Storage

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todos));
    // console.log('run');
  }, [todos]);

  return (
    <>
      <div className='container1'>
        <div className='todoWrapper'>
          <h1 className='heading'>Todo List </h1>
          <div className='inputWrapper'>
            <input
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {toggle ? (
              <button className='btn-add' onClick={handleAdd}>
                Add
              </button>
            ) : (
              <button className='btn-add' onClick={handleAdd}>
                Edit
              </button>
            )}
          </div>
          {todos.length > 0 ? (
            todos.map((todo) => {
              const { name, id } = todo;
              return (
                <div className='data_wrapper' key={id}>
                  <p>{name}</p>
                  <div className='btn_details'>
                    <div
                      className='btn_wrapper left '
                      onClick={() => handleEdit(id)}
                    >
                      <button className='edit'>Edit</button>
                      <i className='fa-solid fa-pen-to-square white'></i>
                    </div>
                    <div
                      className='btn_wrapper right'
                      onClick={() => handleDelete(id)}
                    >
                      <button className='delete'>Delete</button>
                      <i className='fa-solid fa-trash white '></i>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: 'center', color: 'white' }}>No Todos </p>
          )}
          {todos.length > 0 ? (
            <div className='clear_all'>
              <button className='deleteAll' onClick={handleDeleteAll}>
                Delete All
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Todo;
