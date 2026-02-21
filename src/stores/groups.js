import { defineStore } from 'pinia';
import axios from 'axios';

export const useGroupsStore = defineStore('groups', {
    state: () => ({
        allGroups: [],
        currentGroup: null,
        members: [], // New list of members
        verifiedGroups: {},
        loading: false,
        error: null,
    }),
    actions: {
        async fetchAllGroups() {
            this.loading = true;
            try {
                const response = await axios.get('http://localhost:5000/api/groups/all');
                this.allGroups = response.data;
            } catch (err) {
                this.error = err.response?.data?.error || 'Failed to fetch groups';
            } finally {
                this.loading = false;
            }
        },
        async createGroup(name, password) {
            await axios.post('http://localhost:5000/api/groups/create', { name, password });
        },
        async verifyGroup(groupId, password) {
            this.loading = true;
            try {
                await axios.post('http://localhost:5000/api/groups/verify', { groupId, password });
                this.verifiedGroups[groupId] = true;
                return true;
            } catch (err) {
                throw err.response?.data?.error || 'Incorrect password';
            } finally {
                this.loading = false;
            }
        },
        async fetchGroupDetails(id) {
            this.loading = true;
            try {
                const response = await axios.get(`http://localhost:5000/api/groups/${id}`);
                this.currentGroup = response.data.group;
                this.members = response.data.members; // Set members
            } catch (err) {
                this.error = err.response?.data?.error || 'Failed to fetch details';
            } finally {
                this.loading = false;
            }
        },
        async addMember(groupId, name) {
            try {
                const response = await axios.post('http://localhost:5000/api/groups/add-member', { groupId, name });
                // Optimistic: Add to list
                this.members.push({ ...response.data, progress: [] });
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        async toggleProgress(memberId, juzNumber, completed) {
            try {
                await axios.post('http://localhost:5000/api/groups/toggle-progress', { memberId, juzNumber, completed });
                // Optimistic Update
                const member = this.members.find(m => m.id === memberId);
                if (member) {
                    if (completed) {
                        if (!member.progress.includes(juzNumber)) member.progress.push(juzNumber);
                    } else {
                        member.progress = member.progress.filter(j => j !== juzNumber);
                    }
                }
            } catch (err) {
                console.error(err);
                // Revert optimistic update if needed (omitted for simplicity)
            }
        }
    }
});
