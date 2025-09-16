import { useEffect, useState } from "react";
import { getTodoById } from "../apis/api";
import { useParams } from "react-router";
import { Card, Typography, Spin, Button } from "antd";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined, CheckCircleTwoTone, ClockCircleOutlined } from "@ant-design/icons";
import ErrorPage from "./ErrorPage";

const { Title, Text } = Typography;

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodoById(id)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => setError(err));
  }, [id]);

  if (error) {
    return <ErrorPage />;
  }

  if (!todo)
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );

  return (
    <div style={{ maxWidth: 480, margin: "40px auto" }}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/todos")}
        style={{ marginBottom: 16 }}
      >
        返回
      </Button>
      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          boxShadow: "0 2px 12px #eee",
        }}
      >
        <Title level={3} style={{ marginBottom: 16 }}>
          事项详情
        </Title>
        <Text strong style={{ fontSize: 18 }}>
          {todo.text}
        </Text>
        <div style={{ marginTop: 24 }}>
          {todo.done ? (
            <span>
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
              <Text type="success">已完成</Text>
            </span>
          ) : (
            <span>
              <ClockCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
              <Text type="warning">未完成</Text>
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TodoDetail;
