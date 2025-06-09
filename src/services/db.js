import Dexie from 'dexie';

export const db = new Dexie('TodoAppDB');
db.version(1).stores({
    tasks:'++id, userId, name, completed, priority, createdAt'
});

export const TodoService = {
    async addTask(userId, task) {
        return db.tasks.add({
            ...task, userId, createdAt: new Date()
        })
    },
    async getTasks(userId) {
        return db.tasks.where('userId').equals(userId).toArray();
    },
    async deleteTasks(id) {
        return db.tasks.delete(id);
    },

    async clearCompleted(userId) {
        return db.tasks.where('userId').equals(userId)
            .filter(t=>t.completed)
            .delete();
    }
}