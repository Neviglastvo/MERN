import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader/Loader"
import { PcCard } from "../components/PC/PcView"
// import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

const PcDetailPage = () => {
	// const { token } = useContext(AuthContext)
	const { request, loading } = useHttp()
	const [pc, setPc] = useState()
	const pcName = useParams().name

	const getPc = useCallback(async () => {
		try {
			const fetched = await request(`/api/pc/${pcName}`, "GET", null)
			setPc(fetched)
		} catch (error) {
			console.log("getPc", error)
		}
	}, [request, pcName])

	useEffect(() => {
		getPc()
	}, [getPc])

	if (loading) {
		return <Loader />
	} else {
		return <>{pc && <PcCard pc={pc} />}</>
	}
}

export default PcDetailPage
