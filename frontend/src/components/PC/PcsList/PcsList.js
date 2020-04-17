import Grid from "@material-ui/core/Grid"
import { Loader } from "components/Loader/Loader"
import { PcList } from "components/PC/PcList/PcList"
import { useHttp } from "hooks/http.hook"
import React, { useCallback, useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { fetchPcs } from "redux/actions"
import "./pcslist.sass"

const PcsList = () => {
	// const [pcs, setPcs] = useState([])
	// const { loading, request } = useHttp()

	// const fetchPcs = useCallback(async () => {
	// 	const fetched = await request(`/api/pc`, "GET", null)
	// 	setPcs(fetched)
	// }, [request])

	// useEffect(() => {
	// 	fetchPcs()
	// }, [fetchPcs])

	const dispatch = useDispatch()
	const pcs = useSelector((state) => state.pcs.pcs)
	const loading = useSelector((state) => state.app.loading)

	useEffect(() => {
		dispatch(fetchPcs())
	}, [])

	if (loading) {
		return <Loader />
	} else {
		return (
			<>
				<Grid container spacing={2}>
					{pcs && <PcList pcs={pcs} />}
				</Grid>
			</>
		)
	}
}

export default PcsList
