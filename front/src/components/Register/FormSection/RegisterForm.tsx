import { toastConfig } from "@/utils/toast";
import useLocalRegister from "@hooks/mutations/auth/useLocalRegister";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

interface Form {
  email: string;
  displayName: string;
  password: string;
  position: string;
}
const RegisterForm = () => {
  const router = useRouter();
  const {
    mutate: localRegisterMutate,
    isLoading: localRegisterLoading,
    isSuccess: localRegisterSuccess,
  } = useLocalRegister();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Form>({
    mode: "all",
  });

  const handleLocalRegister = handleSubmit(async (data) => {
    const { email, displayName, password, position } = data;
    if (position === "default") {
      return toast.error("직무를 선택해주세요.", toastConfig);
    }
    localRegisterMutate({
      email,
      displayName,
      password,
      position,
    });
  });

  return (
    <form onSubmit={handleLocalRegister} className=''>
      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='email-address' className='sr-only'>
            Email address
          </label>
          <span>이메일</span>
          <input
            {...register("email", {
              required: true,
            })}
            id='email-address'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='email'
            autoComplete='email'
          />
        </div>
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='displayName' className='sr-only'>
            displayName
          </label>
          <span>사용자명</span>
          <input
            {...register("displayName", {
              required: true,
              maxLength: {
                value: 10,
                message: "사용자명 제한",
              },
            })}
            id='displayName'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='text'
            autoComplete='displayName'
            disabled={localRegisterLoading}
          />
        </div>
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='password' className='sr-only'>
            password
          </label>
          <span>비밀번호</span>
          <input
            {...register("password", {
              required: true,
              maxLength: 14,
            })}
            id='password'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='password'
            autoComplete='password'
            disabled={localRegisterLoading}
          />
        </div>
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='position' className='sr-only'>
            Position
          </label>
          <span>직무 선택</span>

          <select
            id='position'
            {...register("position", {
              required: true,
            })}
            placeholder='선택하쇼'
          >
            <option value='default'>직무를 선택해주세요</option>
            <option value='developer'>개발자</option>
            <option value='designer'>디자이너</option>
          </select>
        </div>
      </div>

      <button
        type='submit'
        className='disabled:opacity-50 bg-white'
        disabled={localRegisterLoading || localRegisterSuccess}
      >
        가입
      </button>

      <PropagateLoader color='white' loading={false} size={10} />
    </form>
  );
};

export default RegisterForm;
