import { apiSlice } from "../../app/api/apiSlice";

// const projectsAdapter = createEntityAdapter({});

// const initialState = projectsAdapter.getInitialState();

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchProjects: builder.query({ // Populates user, location, and replaces category with string
            query: (projectSearchData) => ({
                url: `/projects/search`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
                params: projectSearchData
            }),
            transformResponse: (responseData) => {
                const loadedProjects = responseData.map((project) => {
                    project.id = project._id;
                    project.user.id = project.user._id;
                    project.location.id = project.location._id;
                    return project;
                });
                return loadedProjects;
            },
            // Mainly used for automatically refetching cached data
            // Might be unnecessary?
            // providesTags: (result, error, arg) => {
            //     if (result?.ids) {
            //         return [
            //             { type: 'Project', id: 'LIST' },
            //             ...result.ids.map(id => ({ type: 'Project', id}))
            //         ];
            //     } else {
            //         return [{ type: 'Project', id: 'LIST' }];
            //     }
            // }
        }),
        getProjectsByUser: builder.query({ // Populates user, location, and replaces category with string
            query: ({ user }) => ({
                url: `/projects/user/${user}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedProjects = responseData.map((project) => {
                    project.id = project._id;
                    project.location.id = project.location._id;
                    return project;
                });
                return loadedProjects;
            },
        }),
        getProject: builder.query({ // Populates user, location, and replaces category with string
            query: ({ id }) => ({
                url: `/projects/id/${id}`,
                validateStatus: (response, result) => {
                    return (response.status === 200) & !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                responseData.id = responseData._id;
                responseData.user.id = responseData.user._id;
                responseData.location.id = responseData.location._id;
                return responseData;
            },
            // providesTags: (result, error, arg) => {
            //     const { id } = arg;
            //     if (result) {
            //         return [{ type: 'Project', id }];
            //     }
            //     return [{ type: 'Project' }];
            // }
        }),
        addNewProject: builder.mutation({
            query: (initialProjectData) => ({
                url: "/projects",
                method: "POST",
                body: {
                    ...initialProjectData,
                },
            }),
            // invalidatesTags: (result, error, arg) => [
            //     { type: 'Project', id: 'LIST' }
            // ]
        }),
        updateProject: builder.mutation({
            query: ({ id, ...updateProjectData }) => ({
                url: `/projects/id/${id}`,
                method: "PATCH",
                body: {
                    ...updateProjectData,
                },
            }),
            // invalidatesTags: (result, error, arg) => [
            //     { type: 'Project', id: arg.id }
            // ]
        }),
        deleteProject: builder.mutation({
            query: ({ id }) => ({
                url: `/projects/id/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags: (result, error, arg) => [
            //     { type: 'Project', id: arg.id }
            // ]
        }),
    }),
});

export const {
    useSearchProjectsQuery,
    useGetProjectQuery,
    useGetProjectsByUserQuery,
    useAddNewProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsApiSlice;
