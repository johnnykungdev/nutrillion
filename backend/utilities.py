import os
import errno

static_tmp_path = os.path.join(os.path.dirname(__file__), 'static','data')

def make_static_tmp_dir():
    try:
        os.makedirs(static_tmp_path)
    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(static_tmp_path):
            pass
        else:
            raise