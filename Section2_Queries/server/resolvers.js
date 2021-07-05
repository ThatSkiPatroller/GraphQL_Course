const db = require('./db');

const Query = {
    company: (root, {id}) => db.companies.get(id),
    job: (root, {id}) => db.jobs.get(id),
    jobs: () => db.jobs.list()
};

// one to many relationship company to jobs

const Company = {
    jobs: (company) => db.jobs.list()
        .filter((job) => job.companyId === company.id)
};

const Job = {
    company: (job) => db.companies.get(job.companyId) 
};

const Mutation = {
    createJob: (root, {companyId, title, description}) => {
        return db.jobs.create({companyId, title, description})
    }
};

module.exports = { Query, Job, Company, Mutation };