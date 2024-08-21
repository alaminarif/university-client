import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

const AcademicFaculty = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const option: any = [];
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={option} />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default AcademicFaculty;

// resolver={zodResolver(academicSemesterSchema)}
