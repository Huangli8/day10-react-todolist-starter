import { useContext, useEffect,useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { Card, Empty, Space, Typography, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { getTodos } from "../apis/api";
import { useNavigate } from "react-router"; 
const { Text } = Typography;

const TodoDone = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [doneTodos, setDoneTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTodos().then((res) => {
      dispatch({ type: "LOAD_TODOS", todos: res.data });
      setDoneTodos(res.data.filter((todo) => todo.done));
    });
  }, []);

  return (
    <div className="todo-group">
      <Card
        title={
          <span style={{ fontSize: 22, fontWeight: 600 }}>✅ 已完成事项</span>
        }
        bordered={false}
        style={{
          maxWidth: 480,
          margin: "20px auto",
          borderRadius: 16,
          boxShadow: "0 2px 12px #eee",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          {doneTodos.length === 0 ? (
            <Empty description="暂无已完成事项" imageStyle={{ height: 60 }} />
          ) : (
            doneTodos.map(({ id, text }) => (
              <Card
                key={id}
                className="todo-item-card"
                size="small"
                style={{
                  marginBottom: 12,
                  borderRadius: 8,
                  background: "#f6ffed",
                  borderColor: "#b7eb8f",
                }}
                bodyStyle={{
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  style={{ marginRight: 8 }}
                />
                <Text delete style={{ fontSize: 16 }}>
                  {text}
                </Text>
              </Card>
            ))
          )}
        </Space>
      </Card>
      <Button color="cyan" variant="solid" onClick={() => navigate("/todos")}>
        返回
      </Button>
    </div>
  );
};

export default TodoDone;
