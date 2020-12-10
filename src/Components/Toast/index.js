import React from 'react';


const Toast = (props) => {
  const { toastList, position } = props;
  const [list, setList] = useState(toastList);

  const deleteToast = (id) => {
    const index = list.findIndex((e) => e.id === id);
    list.splice(index, 1);
    setList([...list]);
  };

  return (
    <>
      <NotificationContainer className={` ${position}`}>
        {list.map((toast, i) => (
          
          <Notification
          key={i}
          className={`${position}`}
          BgColor= {'white'}
          >
          {console.log(toast)}
            <Btn onClick={() => deleteToast(toast.id)}>X</Btn>
            <NotificationImg>
              <Img src={toast.icon} alt="" />
            </NotificationImg>
            <div>
              <Title>{toast.title}</Title>
              <Msg>{toast.message}</Msg>
            </div>
          </Notification>
        ))}
      </NotificationContainer>
    </>
  );
};

export default Toast;
