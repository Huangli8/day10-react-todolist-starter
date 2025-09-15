import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./TodoList.css";
import {
  Card,
  Input,
  Button,
  Empty,
  Space,
  Typography,
  message,
  Modal,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  EditOutlined,
} from "@ant-design/icons";
import { addTodo, getTodos, updateTodo, deleteTodo } from "../apis/api";

const { Text } = Typography;

const TodoList = () => {
  const value = useContext(TodoContext);
  const { state, dispatch } = value;
  const [input, setInput] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false); // 控制编辑弹窗
  const [editValue, setEditValue] = useState(""); // 编辑框内容
  const [editId, setEditId] = useState(null); // 正在编辑的 todo id

  const handleEditSave = async () => {
    if (editValue.trim()) {
      await updateTodo(editId, { text: editValue.trim() });
      dispatch({ type: "EDIT", id: editId, text: editValue.trim() });
      setEditModalOpen(false);
      message.success("修改成功！");
    } else {
      message.warning("内容不能为空！");
    }
  };

  useEffect(() => {
    getTodos().then((res) => {
      dispatch({ type: "LOAD_TODOS", todos: res.data });
    });
  }, []);

  const toggleDone = async (id, done) => {
    updateTodo(id, { done: !done }).then(() => {
      dispatch({ type: "DONE", id: id });
    });
  };

  const handleAdd = async () => {
    if (input && input.trim()) {
      const todo = {
        text: input.trim(),
        done: false,
      };
      addTodo(todo).then((res) => {
        dispatch({ type: "ADD", todo: res.data });
        message.success("添加成功！");
      });
      setInput("");
    } else {
      message.warning("请输入内容");
    }
  };

  const handleDelete = async (id) => {
    deleteTodo(id).then(() => {
      dispatch({ type: "DELETE", id: id });
      message.success("已删除");
    });
  };

  return (
    <div className="todo-group">
      <Card
        title={
          <span style={{ fontSize: 22, fontWeight: 600 }}>📝 Todo List</span>
        }
        bordered={false}
        style={{
          maxWidth: 480,
          margin: "40px auto",
          borderRadius: 16,
          boxShadow: "0 2px 12px #eee",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="添加新的待办事项"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleAdd}
              allowClear
              size="large"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={handleAdd}
            >
              添加
            </Button>
          </Space.Compact>
          {state.length === 0 ? (
            <Empty description="暂无待办事项" imageStyle={{ height: 60 }} />
          ) : (
            <div>
              {state.map(({ id, text, done }) => (
                <Card
                  key={id}
                  className="todo-item-card"
                  size="small"
                  style={{
                    marginBottom: 12,
                    borderRadius: 8,
                    background: done ? "#f6ffed" : "#fff",
                    borderColor: done ? "#b7eb8f" : "#f0f0f0",
                  }}
                  bodyStyle={{
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className={`todo-item-text ${done ? "done" : ""}`}
                    onClick={() => toggleDone(id, done)}
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {done && (
                      <CheckCircleTwoTone
                        twoToneColor="#52c41a"
                        style={{ marginRight: 8 }}
                      />
                    )}
                    <Text delete={done} style={{ fontSize: 16 }}>
                      {text}
                    </Text>
                  </div>

                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditId(id); // 记录当前编辑项 id
                      setEditValue(text); // 初始值设为当前 text
                      setEditModalOpen(true);
                    }}
                    style={{ marginRight: 8 }}
                  />

                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(id)}
                  />
                </Card>
              ))}
            </div>
          )}
        </Space>
      </Card>
      <Modal
        title="修改待办事项"
        open={editModalOpen}
        onOk={handleEditSave}
        onCancel={() => setEditModalOpen(false)}
        okText="保存"
        cancelText="取消"
      >
        <Input
          style={{ width: "100%" }}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="请输入新的内容"
          allowClear
          onPressEnter={handleEditSave}
        />
      </Modal>
    </div>
  );
};

export default TodoList;
