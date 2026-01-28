import { redirect, RedirectType } from "next/navigation";

export default function Posts(){
	redirect('/explore', RedirectType.replace);
}