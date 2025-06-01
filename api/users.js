// Sample users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', age: 25 },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', age: 29 },
  { id: 5, name: 'David Brown', email: 'david@example.com', age: 35 }
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { method, query } = req;

  if (method === 'GET') {
    // If there's an ID parameter, return single user
    if (query.id) {
      const userId = parseInt(query.id);
      const user = users.find(u => u.id === userId);
      
      if (user) {
        return res.status(200).json({
          success: true,
          data: user
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    }
    
    // Return all users
    return res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  }

  // Method not allowed
  res.setHeader('Allow', ['GET']);
  res.status(405).json({
    success: false,
    message: `Method ${method} Not Allowed`
  });
}