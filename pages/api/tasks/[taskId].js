/* eslint-disable import/no-anonymous-default-export */
import Task from "../../../models/Task";
import dbConnect from '../../../services/dbConnection'

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  console.log(req.query)
  const { taskId } = req.query;
  switch (method) {
    case "PUT":
      try {
        const { title, status } = req.body;
        if (!title && !status) return "invalid data";
        await Task.updateOne({ _id: taskId }, { title, status });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "DELETE":
      try {
        await Task.deleteOne({ _id: taskId });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}