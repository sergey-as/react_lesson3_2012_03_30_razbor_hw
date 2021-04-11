import React, {useEffect, useState} from 'react';
import './App.css'

const Tabs = ({tabs, selectedTab}) => {

    return (
        <div style={{
            display: 'flex',
            // 'flex-direction': 'column',
            // flexDirection: 'column',
        }}>
            {tabs.map(tab => (
                <button
                    key={tab.title}
                    style={{
                        flex: 1,
                        height: '50px',
                        background: selectedTab === tab.title ? 'green' : 'white'
                    }}
                    onClick={tab.clickHandler}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    )
}

const PostList = ({list}) => {
    return (
        <>{list.map(item => (
            <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
            </div>
        ))}</>
    )
}

const CommentList = ({list}) => {
    return (
        <>{list.map(item => (
            <div key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.body}</p>
            </div>
        ))}</>
    )
}

const AlbumList = ({list}) => {
    return (
        <>{list.map(item => (
            <div key={item.id}>
                <h3>{item.title}</h3>
            </div>
        ))}</>
    )
}

const PhotoList = ({list}) => {
    return (
        <>{list.map(item => (
            <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.thumbnailUrl}</p>
                <img src={item.thumbnailUrl} alt=""/>
            </div>
        ))}</>
    )
}

const TodoList = ({list}) => {
    return (
        <>{list.map(item => (
            <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.completed.toString()}</p>
            </div>
        ))}</>
    )
}

const UserList = ({list}) => {
    return (
        <>{list.map(item => (
            <div key={item.id}>
                <h3>{item.name} -- {item.username} -- {item.email}</h3>
            </div>
        ))}</>
    )
}

const urlBuilder = (resource) => `https://jsonplaceholder.typicode.com/${resource}`;

const POSTS = 'posts';
const COMMENTS = 'comments';
const ALBUMS = 'albums';
const PHOTOS = 'photos';
const TODOS = 'todos';
const USERS = 'users';

const Components = {
    [POSTS]: PostList,
    [COMMENTS]: CommentList,
    [ALBUMS]: AlbumList,
    [PHOTOS]: PhotoList,
    [TODOS]: TodoList,
    [USERS]: UserList,
}

function App() {
    // const onTabChangeHandler = (tab) => {
    //     if (tab !== selectedTab) {
    //         setSelectedTab(tab);
    //         // setList([]);
    //     }
    // }

    const tabs = [
        {title: POSTS, clickHandler: () => setSelectedTab(POSTS)},
        {title: COMMENTS, clickHandler: () => setSelectedTab(COMMENTS)},
        {title: ALBUMS, clickHandler: () => setSelectedTab(ALBUMS)},
        {title: PHOTOS, clickHandler: () => setSelectedTab(PHOTOS)},
        {title: TODOS, clickHandler: () => setSelectedTab(TODOS)},
        {title: USERS, clickHandler: () => setSelectedTab(USERS)},
        // {title: POSTS, clickHandler: () => onTabChangeHandler(POSTS)},
        // {title: COMMENTS, clickHandler: () => onTabChangeHandler(COMMENTS)},
        // {title: ALBUMS, clickHandler: () => onTabChangeHandler(ALBUMS)},
        // {title: PHOTOS, clickHandler: () => onTabChangeHandler(PHOTOS)},
        // {title: TODOS, clickHandler: () => onTabChangeHandler(TODOS)},
        // {title: USERS, clickHandler: () => onTabChangeHandler(USERS)},
    ]

    const [selectedTab, setSelectedTab] = useState(tabs[0].title);
    // const [list, setList] = useState([]);

    const [data, setData] = useState({
        [POSTS]: [],
        [COMMENTS]: [],
        [ALBUMS]: [],
        [PHOTOS]: [],
        [TODOS]: [],
        [USERS]: [],
    });

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const responce = await fetch(urlBuilder(selectedTab));
        const json = await responce.json();
        setData({...data, [selectedTab]: json})

        // setList(data);
        setIsLoading(false);
        // console.log(selectedTab, data);
    }

    useEffect(() => {
        fetchData();

        // return () => {
        //     setList([])
        // }
    }, [selectedTab])

    const ComponentToRender = Components[selectedTab];

    return (
        <div className="App">
            <Tabs tabs={tabs} selectedTab={selectedTab}/>
            {isLoading && !data[selectedTab].length ? <h1>LOADING DATA...</h1> : (
                <ComponentToRender list={data[selectedTab]}/>

                // <>
                //     {selectedTab === POSTS && <PostList data={list}/>}
                //     {selectedTab === COMMENTS && <CommentList data={list}/>}
                //     {selectedTab === ALBUMS && <AlbumList data={list}/>}
                //     {selectedTab === PHOTOS && <PhotoList data={list}/>}
                //     {selectedTab === TODOS && <TodoList data={list}/>}
                //     {selectedTab === USERS && <UserList data={list}/>}
                // </>
            )}
        </div>
    );
}

export default App;


// дз
//
// урл
// https://jsonplaceholder.typicode.com/
//
//     ендпоінти
//   /posts
//   /comments
//   /albums
//   /photos
//   /todos
//   /users
//
// потрібно створити логіку, яка задовільнить наступні вимоги
// в нас має бути 6 кнопок, які дозволяють нам переключатись між 'табами' (posts, comments, albums, photos, todos, users)
// дефолтно обрана таба- пости
// по кліку на кнопку ми повинні підтягнути відповідний список і зрендерити його через .map
// лише 1 список видимий одночасно
// потрібно створити 6 компонент, які займатимуться рендерінгом списків (отримуватимуть пропсами список)- PostList, CommentsList...
