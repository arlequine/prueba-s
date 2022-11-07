/* eslint-disable import/no-anonymous-default-export */
import Task from '../../../models/Task'
import dbConnect from '../../../services/dbConnection'

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const { title, status } = req.body;

        if (!title && !status) throw "invalid data";
        const task = await Task.create({ title, status });

        res.status(201).json({ success: true, data: task });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}

// export default async (req, res) => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("todos");

//     const tasks = await db
//       .collection("tasks")
//       .find({})
//       .sort({ metacritic: -1 })
//       .limit(20)
//       .toArray();

//     res.json(tasks);
//   } catch (e) {
//     console.error(e);
//   }
// };