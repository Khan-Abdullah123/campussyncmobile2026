import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export const LoginSchema = zod.object({
  email: zod.string().min(1, { message: 'Email or Username is required!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

export const PhoneLoginSchema = zod.object({
  phoneNumber: zod.string().min(10, { message: 'Phone number must be at least 10 digits!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function LoginView({ role }) {
  const router = useRouter();
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');
  const [method, setMethod] = useState('email');

  const defaultValues = {
    email: '',
    phoneNumber: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(method === 'email' ? LoginSchema : PhoneLoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { checkUserSession } = useAuthContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({
        email: method === 'email' ? data.email : undefined,
        phoneNumber: method === 'phone' ? data.phoneNumber : undefined,
        password: data.password,
        role,
      });

      await checkUserSession();

      toast.success('Login success!');

      router.push(paths.home);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const handleChangeMethod = (event, newValue) => {
    setMethod(newValue);
    setErrorMsg('');
  };

  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="h5">Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}</Typography>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          New user?
        </Typography>
        <Link variant="subtitle2">Create an account</Link>
      </Stack>
    </Stack>
  );

  return (
    <>
      {renderLogo}

      {renderHead}

      <Tabs
        value={method}
        onChange={handleChangeMethod}
        sx={{
          mb: 3,
          [`& .MuiTabs-flexContainer`]: {
            justifyContent: 'center',
          },
        }}
      >
        <Tab label="Email / Username" value="email" />
        <Tab label="Phone Number" value="phone" />
      </Tabs>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          {method === 'email' ? (
            <Field.Text
              name="email"
              label="Email or Username"
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Field.Text
              name="phoneNumber"
              label="Phone Number"
              placeholder="e.g. 9876543210"
              InputLabelProps={{ shrink: true }}
            />
          )}

          <Field.Text
            name="password"
            label="Password"
            type={password.value ? 'text' : 'password'}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {method === 'email' && (
            <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
              Forgot password?
            </Link>
          )}

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mb: 2 }}
          >
            Login
          </LoadingButton>

          <Link
            component={RouterLink}
            href={paths.auth.roleSelection}
            color="inherit"
            variant="subtitle2"
            sx={{
              mx: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <Iconify icon="eva:arrow-ios-back-fill" width={16} sx={{ mr: 0.5 }} />
            Return to role selection
          </Link>
        </Stack>
      </Form>
    </>
  );
}
