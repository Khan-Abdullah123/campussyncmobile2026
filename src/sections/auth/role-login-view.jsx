import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const API_BASE_URL = 'https://api.campussync.in/api';
const API_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};
const TEACHER_LEGACY_PASSWORD = 'password';
const ROLE_AUTH = {
  teacher: {
    email: 'teacher@test.com',
    password: 'teacher@test',
  },
  parent: {
    email: 'parent@test.com',
    password: 'parent@test',
  },
};

function normalizeRole(role) {
  if (role === 'teacher' || role === 'parent') return role;
  return 'teacher';
}

export function RoleLoginView() {
  const router = useRouter();
  const { role: rawRole } = useParams();
  const role = normalizeRole(rawRole);
  const roleAuth = ROLE_AUTH[role];

  const [email, setEmail] = useState(roleAuth.email);
  const [password, setPassword] = useState(roleAuth.password);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const showPassword = useBoolean();

  const roleLabel = role === 'teacher' ? 'Teacher' : 'Parent';

  const onBackRoleSelection = () => {
    router.push('/role-selection');
  };

  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
    setEmail(roleAuth.email);
    setPassword(roleAuth.password);
  }, [roleAuth.email, roleAuth.password]);

  const teacherLogin = async (userEmail, userPassword) => {
    let response;
    try {
      response = await axios.post(
        `${API_BASE_URL}/teacher/login`,
        { email: userEmail, password: userPassword },
        { headers: API_HEADERS }
      );
    } catch (error) {
      const isDefaultTeacherCreds =
        userEmail === ROLE_AUTH.teacher.email && userPassword === ROLE_AUTH.teacher.password;
      const isInvalidCredential =
        error?.response?.data?.message === 'Invalid credentials.' ||
        error?.response?.data?.errors?.email?.[0] === 'Invalid credentials.';

      if (isDefaultTeacherCreds && isInvalidCredential) {
        response = await axios.post(
          `${API_BASE_URL}/teacher/login`,
          { email: userEmail, password: TEACHER_LEGACY_PASSWORD },
          { headers: API_HEADERS }
        );
      } else {
        throw error;
      }
    }

    if (response?.data?.status !== 'success' || !response?.data?.token) {
      throw new Error('Teacher login failed. Please verify email and password.');
    }

    localStorage.setItem('campussync_token', response.data.token);
    localStorage.setItem('campussync_role', 'teacher');
    localStorage.setItem('campussync_teacher', JSON.stringify(response?.data?.teacher ?? {}));
  };

  const onLoginWithCredentials = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter username/email and password.');
      }

      if (role === 'teacher') {
        if (email !== ROLE_AUTH.teacher.email || password !== ROLE_AUTH.teacher.password) {
          throw new Error('Only teacher credentials are allowed on teacher login.');
        }

        await teacherLogin(email, password);

        setSuccessMsg('Teacher login successful.');
        router.replace('/dashboard');
        return;
      }

      if (email !== ROLE_AUTH.parent.email || password !== ROLE_AUTH.parent.password) {
        throw new Error('Only parent credentials are allowed on parent login.');
      }

      localStorage.setItem('campussync_role', role);
      localStorage.setItem('campussync_parent_token', 'parent-local-session');
      localStorage.setItem('campussync_parent_identifier', email);
      setSuccessMsg('Parent login successful.');
      router.replace('/dashboard');
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.errors?.email?.[0] ||
        error?.response?.data?.errors?.password?.[0] ||
        error?.message ||
        'Unable to complete login request.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3} sx={{ pb: 1 }}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h4">{roleLabel} login</Typography>
          <Chip size="small" label={roleLabel} color="primary" variant="outlined" />
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Continue with your credentials to access the {roleLabel} dashboard.
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 2.5 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Username or Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword.value ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              loading={loading}
              color="inherit"
              size="large"
              variant="contained"
              onClick={onLoginWithCredentials}
            >
              Login
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>

      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {!!successMsg && <Alert severity="success">{successMsg}</Alert>}

      <Divider />

      <Button variant="text" onClick={onBackRoleSelection}>
        Back to role selection
      </Button>
    </Stack>
  );
}

