import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase, { db } from '../connectDB';

export default class extends React.Component{
    //登録ボタンが押されたら
    handleOnSubmit(values){
        console.log("touched")
        const docId = db.collection("users").doc().id;
        db.collection("users").doc(docId).set({
            "first": "afa",
            "last": "asd",
            "born": "1998",
            // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        //登録後、Topに移動
        this.props.history.push("/");
    }
    render(){
        // const type = (this.props.match.params.mode == "extra" ? "(for experts)": "");
        
        return (
            <div>
                <h1>Search</h1>
                <h3 className="text-center my-5">新規作成</h3>
                <Formik
                    initialValues={{ name: '', email: '' }}
                    onSubmit={values => this.handleOnSubmit(values)}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('氏名は必須です。'),
                        email: Yup.string().email('emailの形式ではありません。').required('Emailは必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">氏名</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={Boolean(touched.name && errors.name)}
                                    />
                                    <FormFeedback>
                                        {errors.name}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        email="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={Boolean(touched.email && errors.email)}
                                    />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </FormGroup>
                                <Button type="submit">登録</Button>
                            </Form>
                        )
                    }
                </Formik>
                <form class="search_container">
                    <input type="text" size="25" placeholder="　キーワード検索" />
                    <div class="radio-container">
                            <input id="radio-1" name="radio" type="radio" />
                            <label for="radio-1" class="radio-label">全てから </label>
                            <input id="radio-2" name="radio" type="radio" />
                            <label  for="radio-2" class="radio-label">タイトルから </label>
                            <input id="radio-3" name="radio" type="radio" />
                            <label  for="radio-3" class="radio-label">著者から </label>
                            <input id="radio-4" name="radio" type="radio" />
                            <label  for="radio-4" class="radio-label">概要から </label>
                            <input id="radio-5" name="radio" type="radio" />
                            <label  for="radio-5" class="radio-label">タグから </label>
                    </div>
                    <input type="submit" value="検索" />
                    <br />
                    <div  class="cp_ipselect cp_sl01">
                    <select required>
                        <option value="" hidden>カテゴリを選ぶ</option>
                        <option value="1">SF</option>
                        <option value="2">サスペンス</option>
                        <option value="3">animal</option>
                        <option value="4">comedy</option>
                    </select>
                    </div>
                </form>
            </div>
        );
    }
}

