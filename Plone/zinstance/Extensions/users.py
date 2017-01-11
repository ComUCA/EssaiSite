import cPickle


def export_users(self):
    pas = self.acl_users
    users = pas.source_users
    passwords = users._user_passwords
    result = dict(passwords)

    f = open('/tmp/out.blob', 'w')
    cPickle.dump(result, f)
    f.close()

    return "done"


def import_users(self, filter):
    pas = self.acl_users
    users = pas.source_users
    f = open('/tmp/out.blob')
    res = cPickle.load(f)
    f.close()

    for uid, pwd in res.items():
        if uid in filter:
            users.addUser(uid, uid, pwd)

    return "done"
